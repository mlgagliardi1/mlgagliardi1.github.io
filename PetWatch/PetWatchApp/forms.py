from django import forms
from .models import REVIEW, LOCATION

# Contact Form
class ContactForm(forms.Form):
    First_Name = forms.CharField(widget=forms.TextInput(attrs={"placeholder": "First Name"}))
    Last_Name = forms.CharField(widget=forms.TextInput(attrs={"placeholder": "Last Name"}))
    email = forms.EmailField(widget=forms.TextInput(attrs={"placeholder": "Email Address"}))
    subject = forms.CharField(widget=forms.TextInput(attrs={"placeholder": "Subject"}))
    message = forms.CharField(widget=forms.Textarea(attrs={"placeholder": "Type your message here..."}))

# Review Form - Commits to DB
class ReviewForm(forms.ModelForm):
    class Meta:
        model = REVIEW 
        fields = '__all__'

# Location Form - Commits to DB
class LocationForm(forms.ModelForm):
    class Meta:
        model = LOCATION
        fields = '__all__'

    