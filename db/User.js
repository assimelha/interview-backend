import Model from './ModelBase';
class User extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'users';
  }

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['firstname', 'lastname', 'email', 'password'],

      properties: {
        id: { type: 'integer' },
        firstname: { type: 'string' },
        lastname: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
      },
    };
  }
}

export default User;
