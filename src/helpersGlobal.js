export const isIE11 = !!window.MSInputMethodContext && !!document.documentMode

export const adminLevels = [{ id: 0, label: "Ritstjóri" }, { id: 1, label: "Aðgangsstjóri" }, { id: 2, label: "Admin" }]

export const getShortDateTimeString = hours =>
  hours > 24 * 7
    ? `${Math.floor(hours / (24 * 7))}v`
    : hours > 24
      ? `${Math.floor(hours / 24)}d`
      : hours > 1
        ? `${Math.floor(hours)}k`
        : "*"

export const getInitials = name =>
  name
    ? name
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase()
    : ""
