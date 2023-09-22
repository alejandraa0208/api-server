class Collection {
  constructor(model) {
    this.model = model;
  }
  
  async create(data) {
    return this.model.create(data);
  }
  
  async readAll() {
    return this.model.findAll();
  }
  
  async readById(id) {
    return this.model.findByPk(id);
  }
  
  async update(id, data) {
    const record = await this.model.findByPk(id);
    if (!record) {
      throw new Error('Record not found');
    }
    return record.update(data);
  }
  
  async delete(id) {
    const record = await this.model.findByPk(id);
    if (!record) {
      throw new Error('Record not found');
    }
    await record.destroy();
  }
}
  
module.exports = Collection;
  