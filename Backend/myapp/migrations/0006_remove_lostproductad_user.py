# Generated by Django 5.1.5 on 2025-02-14 17:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0005_lostproductad_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lostproductad',
            name='user',
        ),
    ]
