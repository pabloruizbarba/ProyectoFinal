# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Assign(models.Model):
    id_playlist = models.OneToOneField('Playlists', models.DO_NOTHING, db_column='id_playlist', primary_key=True)  # The composite primary key (id_playlist, id_file) found, that is not supported. The first column is selected.
    id_file = models.ForeignKey('Files', models.DO_NOTHING, db_column='id_file')
    duration = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Assign'
        unique_together = (('id_playlist', 'id_file'),)


class Devices(models.Model):
    id_device = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    code = models.CharField(max_length=50)
    id_playlist = models.ForeignKey('Playlists', models.DO_NOTHING, db_column='id_playlist')

    class Meta:
        managed = False
        db_table = 'Devices'


class Files(models.Model):
    id_file = models.AutoField(primary_key=True)
    filename = models.CharField(max_length=100)
    type = models.CharField(max_length=25)
    hash_file = models.CharField(max_length=64)
    path = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'Files'


class Playlists(models.Model):
    id_playlist = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    hash_list = models.CharField(max_length=64)

    class Meta:
        managed = False
        db_table = 'Playlists'
