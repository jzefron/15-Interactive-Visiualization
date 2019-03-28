load database
     from sqlite:///db/bellybutton.sqlite
     into os.environ.get('DATABASE_URL', '')

 with include drop, create tables, create indexes, reset sequences

  set work_mem to '16MB', maintenance_work_mem to '512 MB';