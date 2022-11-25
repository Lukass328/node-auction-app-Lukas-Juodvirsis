// /* eslint-disable camelcase */
// /* eslint-disable spaced-comment */
// /* eslint-disable max-len */

// const ItemSchema = require('../schemas/itemSchema');


// module.exports = (io) => {
//   io.on('connect', (socket) => {
//     socket.on('connected', () => {
//       console.log('check 2', socket.connected);
//     });
//     // socket.on('amount', async (data) => {
//     //   console.log('data ===', data);
//     //   const { user, price } = data
//     //   const bid = new BidSchema({
//     //     user,
//     //     price,
//     //   })
//     //   await bid.save();
//     //   const allBids = await BidSchema.find();



//     //   io.emit('bids', allBids)
//     //   console.log('allBids ===', allBids);

//     // });
//     socket.on('item', async (data) => {
//       console.log('newItem ===', data);
//       const { title, image, time, price, bid, bidder, bidHistory } = data;
//       const item = new ItemSchema({
//         image,
//         title,
//         time,
//         price,
//         bid,
//         bidder,
//         bidHistory,

//       });

//       await item.save();
//       // const allItems = await ItemSchema.find({});
//       // io.emit('items', allItems)
//       // console.log('allItems ===', allItems);
//     });
//     socket.on('getAllItems', async (data) => {

//       const allItems = await ItemSchema.find();
//       io.emit('items', allItems)
//     })

//     ////////////////////////////////
//     socket.on('getBidsInfo', async (bidInfo) => {
//       const { item_id, bid, bidder } = bidInfo
//       console.log('bidInfo ===', bidInfo);

//       // const item = await ItemSchema.findOneAndUpdate(
//       //   { _id: item_id }, { bid: bid, bidder: bidder });
//       const history = await ItemSchema.findOneAndUpdate({ _id: item_id }, { $push: { bidHistory: { bid: bid, bidder: bidder } } });




//     })
//     socket.on('oneItem', async (_id) => {
//       console.log('_id ===', _id);

//       const oneItem = await ItemSchema.findOne({ _id });



//       io.emit('updateItem', oneItem);

//     })
//     ////////////////////////////////////////////////
//     // socket.on('UpdateArr', async (bidInfo) => {
//     //   const { item_id, bid, bidder } = bidInfo;
//     //   console.log('bidInfo ===', bidInfo);

//     //   const history = await ItemSchema.findOneAndUpdate({ _id: item_id }, { $push: { bidHistory: { bid: bid, bidder: bidder } } });

//     //   console.log('history ===', history);
//     //   io.emit('bidsHistory', history);

//     // })

//   });
// };
