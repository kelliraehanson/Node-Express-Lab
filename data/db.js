const knex = require('knex');

const db = process.env.DB_ENV || 'development';

const knexConfig = require('../knexfile.js')[db];
// const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};

function find() {
  return db('posts');
}

function findById(id) {
  return db('posts').where({ id: Number(id) });
}

function insert(post) {
  return db('posts')
    .insert(post)
    .then(ids => ({ id: ids[0] }));
}

function update(id, post) {
  return db('posts')
    .where('id', Number(id))
    .update(post);
}

function remove(id) {
  return db('posts')
    .where('id', Number(id))
    .del();
}
