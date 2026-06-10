let _passphrase = '';

export function setPassphrase(value:any) {
    _passphrase = typeof value === 'string' ? value : '';
    // console.log('setPassphrase _passphrase', _passphrase)
}

export function getPassphrase() {
    // console.log('getPassphrase _passphrase', _passphrase)
    return _passphrase;
    
}

export function clearPassphrase() {
    _passphrase = '';
}
