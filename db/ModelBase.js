import { Model } from 'objection';

class ModelBase extends Model {
  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
  }
}

export default ModelBase;
