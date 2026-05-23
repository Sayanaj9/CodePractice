

require("dotenv").config()

const  express=require("express")
const cors=require("cors")
const port=process.env.PORT || 5000
const app= express()
const pool=require("./db")
const client=require('./services/ai')
app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Hello World")
})
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})
/
//get categories
app.get("/api/categories",async (req,res)=>{
   const categories= await pool.query("SELECT * FROM categories")
   res.json(categories.rows)
})
//get all questions
app.get("/api/questions",async (req,res)=>{
   const questions= await pool.query(`
    SELECT
      questions.*,
      categories.name AS category
    FROM questions
    JOIN categories
    ON questions.category_id = categories.id
  `)
   res.json(questions.rows)
})

//get testcases according to question id
app.post("/api/testcases",async (req,res)=>{
   const { questionId} = req.body;
   const testcases= await pool.query(`SELECT * FROM test_cases   WHERE question_id = $1`,[questionId])
   res.json(testcases.rows)
})
//test the code submitted by user against the available testcases for the question
app.post("/api/testcode", async (req, res) => {

   const { questionId, code } = req.body;

   const testcases = await pool.query(
      `SELECT input, expected_output,id,is_hidden
       FROM test_cases
       WHERE question_id = $1`,
      [questionId]
   );

   const functionName = await pool.query(
      `SELECT function_name
       FROM questions
       WHERE id = $1`,
      [questionId]
   );
   const testCasesOfSelectedQuestion = testcases.rows;
   const functionNameOfSelectedQuestion =
      functionName.rows[0].function_name;

   const executableFunction = new Function(`
      ${code}

      return ${functionNameOfSelectedQuestion};
   `)();

   const results = [];

   for (const testCase of testCasesOfSelectedQuestion) {
      const parsedInput =JSON.parse(testCase.input);
      const expectedOutput =JSON.parse(testCase.expected_output);

      try {
         const actualOutput =executableFunction(...parsedInput);

         const passed =
            JSON.stringify(actualOutput) ===JSON.stringify(expectedOutput);

         results.push({
            input: parsedInput,
            expectedOutput,
            actualOutput,
            id:testCase.id,
            is_hidden:testCase?.is_hidden,
            passed
         });
      }

      catch (error) {

         results.push({
            input: parsedInput,
            expectedOutput,
            error: error.message,
             id:testCase.id,
            is_hidden:testCase?.is_hidden,
            passed: false
         });

      }
   }

   res.json(results);

});


app.post("/api/ai-test", async (req, res) => {
   try {
      const {code}=req.body;
      const completion = await client.chat.completions.create({
      model: "openrouter/free",
         messages: [
         {
            role: "system",
            content: "You are a DSA interviewer who analyzes code complexity",
         },
         {
            role: "user",
            content: `
                     Analyze this code.
                     Return EXACTLY in this format:
                     Time Complexity:

                     Space Complexity:

                     Explanation:

                     Do not include the code again.
                     Code:
                     ${code}
                     `
                        },
         ],
      });

      res.json({
         analysis: completion.choices[0].message.content
      });
         } catch (error) {

      console.log(error);

      res.status(500).json({
         error: "AI request failed"
      });
   }
});