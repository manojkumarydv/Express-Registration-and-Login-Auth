import UserModel from '../models/userSchema.js'
import bcrypt from 'bcrypt'
class UserController {
    static home = (req,res) =>{
        res.render('home')
    }

    static registration = (req,res) =>{
        res.render('registration')
    }
    //Creating new document using model
    static createUserDoc = async (req,res)=>{
        const hashPassword = await bcrypt.hash(req.body.password,10)
        try {
            const doc = new UserModel({
                name: req.body.name,
                email: req.body.email,
                password: hashPassword
            })
            //Saving document
            await doc.save()
            res.redirect('/login')

            
        } catch (error) {
            console.log(error)
            
        }
    }



    static login = (req,res) =>{
        res.render('login')
    }
    static verifyLogin = async (req,res)=>{
        try {
            const {email,password} = req.body //getting email & password from user to compare with stored email & pass
            // console.log(email);
            const result = await UserModel.findOne({email:email})  //first email is from db and second is from user
            // console.log(result)
            // res.send('Login')
            if(result !=null){
                const isMatch = await bcrypt.compare(password,result.password)
                if(result.email == email && isMatch){
                    res.send(`<h1>Dashboard ---${result}</h1>`)
                }else{
                    res.send('<h1>Email or password is invalid</h1>')
                }
            }else{
                res.send('<h1>You are not a registered user</h1>')

            }
            
        } catch (error) {
            console.log(error);
            
        }
    }
}
export default UserController