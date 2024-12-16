export function saveAsFile(
  fileName: string,
  data = "",
  postfix = (+new Date()).toString()
) {
  let lnk = document.createElement("a");

  lnk.href = `data:text/plain;content-disposition=attachment;fileName=${fileName},${data}`;
  lnk.download = fileName;
  lnk.target = "_blank";
  lnk.style.display = "none";
  lnk.id = `donwloadlnk-${postfix}`;
  document.body.appendChild(lnk);
  lnk.click();
  document.body.removeChild(lnk);
}

export function exportHistory() {
  const file = localStorage.getItem("editedDays")?.toString();
  if (file && file !== "[]") {
    saveAsFile("calendar.json", file);
  } else {
    console.log("localstorage is empty");
  }
}

// Не кроссбраузерно
export async function importFile() {
  try {
    let fileHandle;
    [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    const contents = await file.text();

    return contents;
  } catch (error) {
    console.log(error);
  }
}
