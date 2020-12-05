const Controller = require("../controller/dbController")
const searchArrayOfObjects = require("./searchArrayOfObjects")


/**
 * Contoh:
 * 
 *      const chatlineResult = await chatSenderHelper(req.user.id, foundRecipientPet.userId, req.body.text)
 * 
 * @param {string} senderUserId pengirim chat
 * @param {Object} recipientUserId penerima chat
 * @param {String} text 
 * 
 * @return {Object} hasil chatLine
 */
module.exports = async function chatSenderHelper(senderUserId, recipientUserId, text) {
    // buat variabel awal:
    let foundChat = 0
    let chatLineResult = {}


    // cari semua chatId yang dimiliki senderUserId:
    let senderChatList1 = await new Controller('userChats').get({
        user1Id: senderUserId
    })
    let senderChatList2 = await new Controller('userChats').get({
        user2Id: senderUserId
    })

    // gabungkan kedalam variabel senderChatList:
    let senderChatList = {
        ...senderChatList1,
        ...senderChatList2
    }

    // kalau recipientUserId ditemukan didalam senderChatList, maka pakai chatId tersebut
    if (senderChatList) {
        if (typeof senderChatList != 'array') {
            senderChatList = [senderChatList]
        }
        if (senderChatList.length) {
            foundChat = searchArrayOfObjects(recipientUserId, senderChatList)
        }
    }


    // proses pengiriman chatLine:
    if (foundChat) {
        // kirim chatLine baru ke responder menggunakan chatId yang ditemukan:
        chatLineResult = await new Controller('userChatLines').add({
            userChatId: foundChat.id,
            userId: senderUserId,
            text: text
        })
    } else {
        // apabila tidak ada chatId yang ditemukan, maka buat chat baru:
        const newChat = await new Controller('userChats').add({
            user1Id: senderUserId,
            user2Id: recipientUserId
        })
        // kirim chatLine baru ke responder menggunkan chatId yang baru dibuat:
        chatLineResult = await new Controller('userChatLines').add({
            userChatId: newChat.id,
            userId: senderUserId,
            text: text
        })
    }


    return chatLineResult
}