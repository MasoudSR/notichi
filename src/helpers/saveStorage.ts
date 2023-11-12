export default function saveStorage(data : {updatedAt : Date ; notes:[] ; folders:[]}[]) {
    const newDate = new Date()
    data.updatedAt = newDate
    localStorage.setItem("data" , JSON.stringify(data))
}
