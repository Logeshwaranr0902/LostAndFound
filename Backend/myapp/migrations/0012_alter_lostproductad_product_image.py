# Generated by Django 5.1.5 on 2025-02-18 15:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0011_alter_lostproductad_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lostproductad',
            name='product_image',
            field=models.ImageField(upload_to='lost_products/'),
        ),
    ]
