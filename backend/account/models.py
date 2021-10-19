from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column,Integer, String, Date, create_engine, ForeignKey
from sqlalchemy.orm import relationship

Base = declarative_base()
engine = create_engine('postgresql://postgres:1505039@localhost/djangoProject', echo=True)
# class Account(models.Model):
#     first_name = models.CharField(max_length=20)
#     last_name = models.CharField(max_length=20)
#     email = models.CharField(max_length=50, unique=True)
#     password = models.CharField(max_length=20)
#     date_of_birth = models.DateField(null=True)
#     avatar = models.TextField(null=True)

class Account(Base):
    __tablename__ = 'account'

    id = Column(Integer, primary_key=True)
    first_name = Column(String(20))
    last_name = Column(String(20))
    email = Column(String(50), unique=True)
    password = Column(String(20))
    date_of_birth = Column(Date)
    avatars = relationship("Avatar", uselist=False, back_populates="account")

class Avatar(Base):
    __tablename__ = 'avatar'

    id = Column(Integer, primary_key=True)
    account_id = Column(Integer, ForeignKey('account.id'))
    avatar = Column(String)
    account = relationship("Account", back_populates="avatars")

Base.metadata.create_all(engine)
    