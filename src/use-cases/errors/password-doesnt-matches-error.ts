export class PasswordDoesntMatches extends Error {
  constructor() {
    super('Passwords doesn`t matches.')
  }
}
