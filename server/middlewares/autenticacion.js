const jwt = require('jsonwebtoken');

// =====================
// Verificar token
// =====================
let verificaToken = (req, res, next) => {
    let token = req.get('Authorization');

    jwt.verify(token, process.env.SEDD, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Authorization invalid'
                }
            });
        }

        req.usuario = decoded.usuario;
    });
    next();
};

// =====================
// Verificar AdminRole
// =====================
let verificaAdmin_Role = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
        next();
    }
};

module.exports = {
    verificaToken,
    verificaAdmin_Role
};