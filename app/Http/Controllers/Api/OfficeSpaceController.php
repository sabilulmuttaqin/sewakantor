<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\OfficeSpaceResource;
use App\Models\OfficeSpace;
use Illuminate\Http\Request;

class OfficeSpaceController extends Controller
{
    public function index()
    {
        $spaces = OfficeSpace::with([
            'city' => function ($query) {
                $query->withCount('officeSpaces');
            }
        ])->get();

        return OfficeSpaceResource::collection($spaces);
    }


    // public function show(OfficeSpace $officeSpace)
    // {
    //     $officeSpace->load(['city', 'photos', 'benefits']);

    //     return new OfficeSpaceResource($officeSpace);
    // }
    public function show(OfficeSpace $officeSpace)
    {
        $officeSpace->load([
            'city' => function ($query) {
                $query->withCount('officeSpaces');
            },
            'photos',
            'benefits'
        ]);

        return new OfficeSpaceResource($officeSpace);
    }
}
