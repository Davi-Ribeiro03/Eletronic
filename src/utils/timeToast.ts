type TimeToast = {
    setToastActive: Function;
    setErro?: Function;
}

export function timeToast({
    setToastActive,
    setErro,
  }:TimeToast) {
    const timeOut = setTimeout(() => {
      setToastActive(false);
       setErro && setErro("");
    }, 3000);

    return timeOut;
}