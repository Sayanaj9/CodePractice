require("dotenv").config()

const  express=require("express")
const cors=require("cors")
const port=process.env.PORT || 5000
const app= express()
const pool=require("./db")
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
   const questions= await pool.query("SELECT * FROM questions")
   res.json(questions.rows)
})
//get all testcases
app.get("/api/testcases",async (req,res)=>{
   const testcases= await pool.query("SELECT * FROM test_cases")
   res.json(testcases.rows)
})

//test user submitted code against the available testcases
app.post("/api/testcode", async (req, res) => {

   const { questionId, code } = req.body;

   const testcases = await pool.query(
      `SELECT input, expected_output
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
            passed
         });

      }

      catch (error) {

         results.push({
            input: parsedInput,
            expectedOutput,
            error: error.message,
            passed: false
         });

      }
   }

   res.json(results);

});
