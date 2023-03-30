import React, { useEffect } from "react";

function Chat() {
  useEffect(() => {
    (function (d, m) {
      var kommunicateSettings = {
        appId: "1cf067b7b0ae3252147d676482e7cf243",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, []);
  return <div>chat</div>;
}

export default Chat;
