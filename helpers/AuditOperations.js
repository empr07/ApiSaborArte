const { Audit } = require('../models/AuditModel');

const registerAudit = (user, nameModule, description) => {
    var today = new Date();
    today.setUTCHours(today.getUTCHours() - 6);
    var todayFormatted = today.toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, '');
    Audit.create(
        {
            user: user,
            module: nameModule,
            description: description,
            createdAt: todayFormatted,
            updatedAt: todayFormatted,
        }
    )
}

module.exports = {
    registerAudit,
};