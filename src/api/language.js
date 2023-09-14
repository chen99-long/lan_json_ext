// 语言包写入
export const submitLanguage = async (data) => {
  try {
    const res = await fetch("http://localhost:3000/languageWrite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error) {
    return error;
  }
};

// 新增语言包
export const addLanguage = async (data) => {
  try {
    const res = await fetch("http://localhost:3000/languageAdd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error) {
    return error;
  }
};

// 查看当前语言包
export const queryLanguageMap = async () => {
  try {
    const res = await fetch("http://localhost:3000/language");
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
