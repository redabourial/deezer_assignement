# Generated by Django 5.0.3 on 2024-03-22 09:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0004_remove_user_users_user_email_6f2530_idx_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="time_to_compute_fib",
            field=models.FloatField(null=True),
        ),
    ]