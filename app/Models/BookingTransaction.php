<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class BookingTransaction extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'phone_number',
        'booking_trx_id',
        'office_space_id',
        'total_amount',
        'duration',
        'started_at',
        'ended_at',
        'is_paid'
    ];

    public function officeSpace(): BelongsTo
    {
        return $this->belongsTo(OfficeSpace::class, 'office_space_id');
    }

    public static function generateUniqueTrxId()
    {
        $prefix = 'MS';
        do {
            $randomstring = $prefix . mt_rand(100, 9999);
        } while (self::where('booking_trx_id', $randomstring)->exists());

        return $randomstring;
    }
}
