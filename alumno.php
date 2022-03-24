<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class alumno extends Model
{
    protected $fillable = [ "idAlumno", "codigo", "nombre", "direccion", "telefono"];
}
