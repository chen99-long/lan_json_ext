export async function translateAPI(text) {
  let req = text;
  const data = JSON.stringify(getTranslateTemplate([req]));
  const myHeaders = new Headers();
  myHeaders.append("Origin", "https://transmart.qq.com");
  myHeaders.append("Referer", "https://transmart.qq.com");
  myHeaders.append("X-Requested-With", "XMLHttpRequest");
  myHeaders.append(
    "User-Agent",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
  );
  myHeaders.append(
    "Cookie",
    "client_key=browser-firefox-110.0.0-Windows 10-942844b6-8ddf-4e41-8851-b590f5022200-" +
      parseInt(new Date().getTime())
  );
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: data,
    redirect: "follow",
  };
  try {
    const resp = await (
      await fetch("https://transmart.qq.com/api/imt", requestOptions)
    ).json();
    return await resp.auto_translation[0];
  } catch (error) {
    return text;
  }
}

function getTranslateTemplate(textList) {
  return {
    header: {
      fn: "auto_translation",
      client_key:
        "browser-firefox-110.0.0-Windows 10-942844b6-8ddf-4e41-8851-b590f5022200-1685073533939",
    },
    type: "plain",
    model_category: "normal",
    source: {
      lang: "zh",
      text_list: textList,
    },
    target: {
      lang: "en",
    },
  };
}
