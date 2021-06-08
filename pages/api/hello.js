// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default (req, res) => {
//   res.status(200).json({ name: 'John Doe' })
// }

const getServices = require('./getServices');

export default (req, res) => {
  // console.log(req.query)
  // console.log(req.cookies)
  // console.log(req.body)
  return getServices.getServices(req, res)
}

