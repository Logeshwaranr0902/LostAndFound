# Generated by Django 5.1.5 on 2025-02-14 18:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0007_lostproductad_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='lostproductadself',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='myapp.user'),
        ),
    ]
