#!/bin/sh -e

psql --variable=ON_ERROR_STOP=1 --username "postgres" <<-EOSQL
    CREATE ROLE root WITH LOGIN PASSWORD 'rootPassword';
    CREATE DATABASE "postgres-db" OWNER = root;
    GRANT ALL PRIVILEGES ON DATABASE "postgres-db" TO root;
EOSQL