import crypto from 'crypto';

function generateSecureAccessKey(length) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}
export const secureAccessKey = generateSecureAccessKey(10); // Генерація ключа довжиною 10 символів
//Ми можемо згенерувати ключ або придумати свій
