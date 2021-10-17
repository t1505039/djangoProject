from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine('postgresql://postgres:1505039@localhost/djangoProject', echo=True)

def sqlalchemy_session():
    Session = sessionmaker(bind=engine)

    return Session()