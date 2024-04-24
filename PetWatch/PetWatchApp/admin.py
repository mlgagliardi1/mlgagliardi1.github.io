from django.contrib import admin
from .models import USER, PET,LOCATION ,EMPLOYEE, REVIEW

# Register models for editing/viewing on the Admin site
admin.site.register(USER)
admin.site.register(PET),
admin.site.register(LOCATION),
admin.site.register(EMPLOYEE),
admin.site.register(REVIEW),