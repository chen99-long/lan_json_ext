export const checkEmptyForm = (obj) => {
  for (let prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      const value = obj[prop];
      if (typeof value === "object" && value !== null) {
        // 递归检查嵌套对象的属性值
        if (checkEmptyForm(value)) {
          return true;
        }
      } else if (value === null || value === undefined || value === "") {
        return true; // 返回true表示存在属性值是空值
      }
    }
  }
  return false; // 返回false表示不存在属性值是空值
};

export const trannformArrToObject = (arr) => {
  let jsonData = {
    en: {},
    "zh-CN": {},
  };

  arr.forEach((item) => {
    jsonData["en"][item.key] = item.en;
    jsonData["zh-CN"][item.key] = item.zh;
  });
  return jsonData;
};

export const transformObjectToArr = (obj) => {
  const keys = Object.keys(obj.en);
  const result = [];

  keys.forEach((key) => {
    const item = {
      key,
      zh: obj["zh-CN"][key],
      en: obj.en[key],
    };

    result.push(item);
  });

  return result;
};

// 将对象导出为JSON文件
export function exportObjectToJSONFile(objectData, fileName) {
  const json = JSON.stringify(objectData);
  const blob = new Blob([json], { type: "application/json" });

  // 创建一个临时的下载链接
  const downloadLink = document.createElement("a");
  downloadLink.download = fileName;
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.click();
}

// 重复属性时做出差别
export function updateArray(arr) {
  const countDict = {};

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const key = item.key;

    if (key in countDict) {
      let count = countDict[key] + 1;
      let newKey = `${key}${count}`;

      while (newKey in countDict) {
        count++;
        newKey = `${key}${count}`;
      }

      countDict[key] = count;
      item.key = newKey;
    } else {
      countDict[key] = 1;
    }
  }

  return arr;
}

export function combineFirstTwoWords(inputString) {
  // 使用正则表达式匹配第一个和第二个单词
  const matches = inputString.match(/\S+/g);

  if (matches) {
    // 如果有至少一个单词，取前两个单词，如果只有一个单词，也会返回它
    const firstWord = matches[0];
    const secondWord = matches[1] || "";

    // 如果第二个单词存在，使用下划线拼接；否则，只返回第一个单词
    const result = secondWord !== "" ? `${firstWord}_${secondWord}` : firstWord;
    return result;
  } else {
    // 如果没有匹配到单词，返回空字符串
    return "";
  }
}
