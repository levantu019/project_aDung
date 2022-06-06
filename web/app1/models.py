from django.db import models

# Create your models here.
class Icons(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False)
    code = models.IntegerField(null=False, blank=False)
    image = models.ImageField(upload_to='images/', null=False, blank=False)
    def __str__(self):
        return self.name

    class Meta:
        db_table = 'icons'

    