const openAi = require("../config/openAI");

const getPromptDataPaid = async (req, res) => {
  try {
    const { userPrompt } = req.body;
    // console.log('userPrompt', userPrompt);

    const response = await openAi.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
      max_tokens: 256,
    });

    console.log("open ai response paid", response);

    // res.status(200).json({
    //   message: "API created successfully..!",
    //   res: response,
    // });
  } catch (error) {
    console.log("getPromptData error", error);
    process.exit(1);
  }
};

module.exports = getPromptDataPaid;
