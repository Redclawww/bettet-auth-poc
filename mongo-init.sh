#!/bin/bash
set -e

# Create the replica set
mongosh --eval "rs.initiate({
  _id: 'rs0',
  members: [{ _id: 0, host: 'localhost:27017' }]
})"

# Wait for the replica set to initialize
sleep 5

# Create root user with appropriate permissions
mongosh admin --eval "
  db.createUser({
    user: 'admin',
    pwd: 'password',
    roles: [{ role: 'root', db: 'admin' }]
  })
"

# Create application database and user
mongosh admin -u admin -p password --eval "
  db = db.getSiblingDB('turborepo');
  db.createUser({
    user: 'app_user',
    pwd: 'app_password',
    roles: [{ role: 'readWrite', db: 'turborepo' }]
  });
"

echo "MongoDB initialized successfully"