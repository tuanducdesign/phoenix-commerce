import bcrypt from 'bcryptjs'


const users = [
    {
        name: 'Admin User',
        email: 'admin@mds.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Ray Banks',
        email: 'ray@mds.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Rio Adrei',
        email: 'rio@admin.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users