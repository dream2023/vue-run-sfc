const url =
  "https://wfwf9k3tn7.execute-api.us-west-2.amazonaws.com/production/process/";

export const getOne = (type, code) =>
  window
    .fetch(url + new Date().getTime() + parseInt(Math.random() * 1000), {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        css: {
          contentType: "css",
          id: "css",
          options: {},
          syntax: type,
          version: "default",
          textInput: code
        }
      })
    })
    .then(res => res.json())
    .then(
      function(data) {
        if (data.success) {
          if (data.payload.css.errors && data.payload.css.errors.length) {
            return {
              success: false,
              error: data.payload.css.errors
                .map(item => item.message)
                .join("\n")
            };
          } else {
            return {
              success: true,
              style: data.payload.css.textOutput
            };
          }
        } else {
          return {
            success: false,
            error: data.errors.map(item => item.message).join("\n")
          };
        }
      },
      function(error) {
        return Promise.resolve({
          success: false,
          error: error.message
        });
      }
    );

export const getStyles = styles => {
  styles = styles.map(item => {
    if (!item.lang) {
      return Promise.resolve({
        success: true,
        style: item.content
      });
    } else if (["scss", "sass", "less", "stylus"].includes(item.lang)) {
      return getOne(item.lang, item.content);
    } else {
      return Promise.resolve({
        success: false,
        error: ""
      });
    }
  });

  return Promise.all(styles);
};
