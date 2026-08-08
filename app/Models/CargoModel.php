<?php

namespace App\Models;

class CargoModel extends BaseModel
{
    protected $table      = 'cargo';
    protected $primaryKey = 'id';

    protected $returnType = 'array';

    protected $allowedFields = [
        'empresa_id',
        'nome',
    ];

    protected $useTimestamps = false;
}