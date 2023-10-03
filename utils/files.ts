export function saveAsFile(fileName: string, data = "", postfix = (+(new Date())).toString()) {
  let lnk = document.createElement('a');

  lnk.href = `data:text/plain;content-disposition=attachment;fileName=${fileName},${data}`;
  lnk.download = fileName;
  lnk.target = "_blank";
  lnk.style.display = "none";
  lnk.id = `donwloadlnk-${postfix}`;
  document.body.appendChild(lnk);
  lnk.click();
  document.body.removeChild(lnk);
}


// вариант сохранения данных в localstorage без потери сохранненых данных в localstorage до импорта
export function importFile(fileName: string) {
  const oldData = localStorage.getItem("editedDays")

  if(oldData) {
    localStorage.setItem("editedDays", JSON.stringify([JSON.parse(oldData), fileName]))
  }
}
