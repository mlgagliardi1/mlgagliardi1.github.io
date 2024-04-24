from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import reverse
from django.views.generic import TemplateView, FormView
from django.contrib.auth import authenticate, login
from .forms import ContactForm, ReviewForm, LocationForm

# Create your views here.
# Login Page
def login(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        #Redirect to Success Page
        return render(request, "PetWatch/index.html")
    else:
        #Return an invalid login error message
        return render(request, "PetWatch/homepage.html")

# Homepage
def index(request):
    return render(request, "PetWatch/index.html")

# About
def about(request):
    return render(request, "PetWatch/about.html")

# Contact
def contact(request):
    return render(request, "PetWatch/contact.html")

# Watch
def watch(request):
    return render(request, "PetWatch/watch.html")

# Locations
def locations(request):
    return render(request, "PetWatch/locations.html")

# Reviews
def reviews(request):
    return render(request, "PetWatch/reviews.html")

# Account
def account(request):
    return render(request, "PetWatch/account.html")

# Blog
def blog(request):
    return render(request, "PetWatch/blog.html")

# Contact
class SuccessView(TemplateView):
    template_name = "PetWatch/success.html"

# Contact
class ContactView(FormView):
    form_class = ContactForm
    template_name = "PetWatch/contact.html"

    def get_success_url(self):
        return reverse("PetWatchApp:contact")

    def form_valid(self, form):
        fname = form.cleaned_data.get("First_Name")
        lname = form.cleaned_data.get("Last_Name")
        email = form.cleaned_data.get("email")
        subject = form.cleaned_data.get("subject")
        message = form.cleaned_data.get("message")

        full_message = f"""
            Received message below from 
            {fname} {lname}, 
            {email}, 
            
            {subject}
            ________________________

            {message}
            """
        send_mail(
            subject="Received contact form submission",
            message=full_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.NOTIFY_EMAIL],
        )
        return super(ContactView, self).form_valid(form)
    
# Review View
class ReviewView(FormView):
    form_class = ReviewForm
    template_name = "PetWatch/reviews.html"

    def get_success_url(self):
        return reverse("PetWatchApp:reviews")

    def form_valid(self, form):     
        review = form.save(commit=False)
        review.save()
        return super(ReviewView, self).form_valid(form)
    
# Location View
class LocationView(FormView):
    form_class = LocationForm
    template_name = "PetWatch/locations.html"

    def get_success_url(self):
        return reverse("PetWatchApp:locations")

    def form_valid(self, form):     
        review = form.save(commit=False)
        review.save()
        return super(LocationView, self).form_valid(form)
