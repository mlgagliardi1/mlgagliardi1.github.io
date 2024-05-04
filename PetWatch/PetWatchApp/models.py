from django.db import models

# Adding the user's photo to their own directory in the media root
def user_directory_path (instance, filename):
    return "user_{0}/{1}.format(instance.user.id, filename)"


# Choice lists for various fields
PET_TYPE_CHOICES = {
    "D": "DOG",
    "C": "CAT",
    "L": "LIZARD",
}

LOCATION_TYPE_CHOICES = {
    "H": "HOME",
    "F": "FARM",
    "K": "KENNEL",
}

EMPLOYEE_PAY_TYPE_CHOICES = {
    "H": "HOURLY",
    "S": "SALARY",
}

# Create your database layout using Django models
# USER Table
class USER (models.Model):
    USER_ID = models.AutoField(primary_key=True)
    USER_PHOTO = models.FileField(upload_to=user_directory_path)
    USER_FIRST_NAME = models.CharField(max_length=50)
    USER_MID_INITIAL = models.CharField(max_length=1)
    USER_LAST_NAME = models.CharField(max_length=50)
    USER_PHONE = models.CharField(max_length=12)
    USER_EMAIL = models.EmailField()
    USER_ADDRESS = models.CharField(max_length=50)
    USER_CITY = models.CharField(max_length=50)
    USER_STATE = models.CharField(max_length=2)
    USER_ZIPCODE = models.IntegerField()
    USER_BIO = models.CharField(max_length=250)
    USER_BIRTHDATE = models.DateField()
    USER_AGE = models.IntegerField()
    
    def __str__(self):
        return '%s %s' % (self.USER_FIRST_NAME, self.USER_LAST_NAME)

# PET Table
class PET (models.Model):
    PET_ID = models.AutoField(primary_key=True)
    PET_OWNER_USER_ID = models.ForeignKey("USER", on_delete=models.CASCADE)
    PET_TYPE = models.CharField(max_length=1, choices=PET_TYPE_CHOICES)
    PET_BREED = models.CharField(max_length=50)
    PET_WEIGHT = models.DecimalField(max_digits=4, decimal_places=1)
    PET_VACCINATION_STATUS = models.BooleanField()

    def __str__(self):
        return '%s %s' % (self.PET_OWNER_USER_ID, self.PET_TYPE)

# LOCATION Table
class LOCATION (models.Model):
    LOCATION_ID = models.AutoField(primary_key=True)
    LOCATION_OWNER_USER_ID = models.ForeignKey("USER", on_delete=models.CASCADE)
    LOCATION_TYPE = models.CharField(max_length=1, choices=LOCATION_TYPE_CHOICES)
    LOCATION_SIZE = models.IntegerField()
    LOCATION_NUMBER_OF_OCCUPANTS = models.IntegerField()
    LOCATION_HAS_KIDS = models.BooleanField()
    LOCATION_HAS_FENCE = models.BooleanField()
    LOCATION_HAS_PETS = models.BooleanField()

    def __str__(self):
        return '%s %s' % (self.LOCATION_OWNER_USER_ID, self.LOCATION_TYPE)
    

# EMPLOYEE Table
class EMPLOYEE (models.Model):
    EMPLOYEE_ID = models.AutoField(primary_key=True)
    EMPLOYEE_USER_ID = models.ForeignKey("USER", on_delete=models.CASCADE)
    EMPLOYEE_SSN = models.CharField(max_length=11)
    EMPLOYEE_TITLE = models.CharField(max_length=50)
    EMPLOYEE_PAY_TYPE = models.CharField(max_length=1, choices=EMPLOYEE_PAY_TYPE_CHOICES)
    EMPLOYEE_PAY_RATE = models.DecimalField(max_digits=5, decimal_places=2)
    EMPLOYEE_HIRE_DATE = models.DateField()

    def __str__(self):
        return '%s %s' % (self.EMPLOYEE_USER_ID, self.EMPLOYEE_TITLE)

# REVIEW Table
class REVIEW (models.Model):
    REVIEWING_USER_ID = models.ForeignKey("USER", on_delete=models.CASCADE)
    REVIEWED_LOCATION = models.ForeignKey("LOCATION", on_delete=models.CASCADE)
    REVIEW_TEXT = models.CharField(max_length=300)
    
    def __str__(self):
        return '%s %s' % (self.REVIEWING_USER_ID, self.REVIEWED_LOCATION)   
    

