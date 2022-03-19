const { dbFirebase } = require("./firebase-init");

async function getUsers(user_id) {
    try {
        const users = dbFirebase.collection('accountability')
        if (!user_id) {
            return (await users.get()).docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        }
        const user = await users.doc(user_id).get()
        return { ...user.data(), id: user.id }
    } catch (e) {
        console.log(e)
    }

}
module.exports = getUsers