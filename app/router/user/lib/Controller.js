const controller = {};
const user = require("../../../models/");

controller.update = async(req, res) => {
    // console.log(req.query);
    console.log(req.body);

    try {
        const Newuser = await user.findOneAndUpdate({ email: req.session.email },
            req.body
        );
        console.log(Newuser);
        return res.send(messages.successfully("Updated"));
    } catch (error) {
        console.log(error);
        return res.staus(500).send("Serverside Error");
    }
};

controller.render = async(req, res) => {
    try {
        const Newuser = await user.aggregate([{
                $match: {
                    email: req.session.email,
                },
            },
            {
                $project: {
                    uType: 0,
                    _id: 0,
                    __v: 0,
                    password: 0,
                },
            },
        ]);
        console.log("Session", req.session);
        console.log("Final Db", Newuser);
        // return res.send(messages.successfully("Updated"));
        res.json({ status: messages.successfully(""), YourProfile: Newuser });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

controller.destroySession = async(req, res) => {};

// controller.create = async(req, res) => {
//     // console.log(req);
//     const data = await new user({
//         Product: req.body.Product,
//         ProductType: req.body.ProductType,
//         ProductColor: req.body.ProductColor,
//         ProductPrice: req.body.ProductPrice,
//         CustomerAddress: req.body.CustomerAddress,
//         CustomerContactNo: req.body.CustomerContactNo,
//     });
//     await data.save();

//     res.json({ message: "User Created!" });
// };

// controller.renderAll = async(req, res) => {
//     console.log(req.body);

//     let findopr = await user.find();
//     let SearchQuery = {
//         $match: {
//             $or: [{
//                     Product: {
//                         $regex: new RegExp(req.body.search.value, "i"),
//                     },
//                 },
//                 {
//                     ProductColor: {
//                         $regex: new RegExp(req.body.search.value, "i"),
//                     },
//                 },
//                 {
//                     ProductType: {
//                         $regex: new RegExp(req.body.search.value, "i"),
//                     },
//                 },
//                 {
//                     ProductPrice: {
//                         $regex: new RegExp(req.body.search.value),
//                     },
//                 },
//                 {
//                     CustomerAddress: {
//                         $regex: new RegExp(req.body.search.value, "i"),
//                     },
//                 },
//                 {
//                     CustomerContactNo: {
//                         $regex: new RegExp(req.body.search.value, "i"),
//                     },
//                 },
//             ],
//         },
//     };

//     const Render = await user.aggregate([
//         SearchQuery,
//         {
//             $project: {
//                 _id: 0,
//             },
//         },
//         {
//             $sort: {
//                 Product: req.body.order[0].dir == "asc" ? 1 : -1,
//             },
//         },
//         {
//             $limit: Number(req.body.length),
//         },
//         // SearchQuery,
//     ]);

//     let data = Render;

//     // console.log(data);
//     let responseApi = {
//         data: data,
//         recordsFiltered: findopr.length,
//         recordsTotal: findopr.length,
//         draw: req.body.draw,
//     };

//     res.json(responseApi);
// };

// controller.delete = async(req, res) => {
//     console.log(req.body);

//     const Newuser = await user.find(req.body);

//     console.log(Newuser);
//     if (Newuser == [] || Newuser.length == 0) {
//         console.log("Data Not Found");
//         return res.status(404).send("Data Not Found");
//     } else {
//         console.log(Newuser);

//         await user.findByIdAndDelete(Newuser[0]._id);

//         return res.send("Deleted");
//     }
// };

module.exports = { controller };