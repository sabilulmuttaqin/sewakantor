<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OfficeSpaceResource\Pages;
use App\Filament\Resources\OfficeSpaceResource\RelationManagers;
use App\Models\OfficeSpace;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class OfficeSpaceResource extends Resource
{
    protected static ?string $model = OfficeSpace::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                // 📌 Bagian Informasi Umum
                Forms\Components\Section::make('Informasi Utama')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Nama')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('address')
                            ->label('Alamat')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\FileUpload::make('thumbnail')
                            ->label('Thumbnail')
                            ->required()
                            ->image(),
                        Forms\Components\Textarea::make('about')
                            ->label('Tentang')
                            ->required()
                            ->rows(5)
                            ->cols(20),
                    ])
                    ->columns(2),

                // 📌 Bagian Galeri Foto
                Forms\Components\Section::make('Galeri Foto')
                    ->schema([
                        Forms\Components\Repeater::make('photos')
                            ->label('Foto')
                            ->relationship('photos')
                            ->schema([
                                Forms\Components\FileUpload::make('photo')
                                    ->label('Foto')
                                    ->required()
                                    ->image(),
                            ]),
                    ]),

                // 📌 Bagian Benefit
                Forms\Components\Section::make('Manfaat')
                    ->schema([
                        Forms\Components\Repeater::make('benefits')
                            ->label('Manfaat')
                            ->relationship('benefits')
                            ->schema([
                                Forms\Components\TextInput::make('name')
                                    ->label('Nama Manfaat')
                                    ->required(),
                            ]),
                    ]),

                // 📌 Bagian Lokasi & Harga
                Forms\Components\Section::make('Detail Lokasi & Harga')
                    ->schema([
                        Forms\Components\Select::make('city_id')
                            ->label('Kota')
                            ->required()
                            ->relationship('city', 'name')
                            ->searchable()
                            ->preload(),
                        Forms\Components\TextInput::make('price')
                            ->label('Harga')
                            ->required()
                            ->prefix('IDR')
                            ->numeric(),
                        Forms\Components\TextInput::make('duration')
                            ->label('Durasi')
                            ->required()
                            ->prefix('Days')
                            ->numeric(),
                    ])
                    ->columns(3),

                // 📌 Bagian Status
                Forms\Components\Section::make('Status')
                    ->schema([
                        Forms\Components\Select::make('is_open')
                            ->label('Status Buka')
                            ->required()
                            ->options([
                                true => "Open",
                                false => "Close",
                            ]),
                        Forms\Components\Select::make('is_full_booked')
                            ->label('Status Pemesanan')
                            ->required()
                            ->options([
                                true => "Full",
                                false => "Available",
                            ]),
                    ])
                    ->columns(2),
            ]);
    }


    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name'),
                Tables\Columns\ImageColumn::make('thumbnail'),
                Tables\Columns\TextColumn::make('city.name'),
                Tables\Columns\IconColumn::make('is_full_booked')
                    ->boolean()
                    ->trueColor('success')
                    ->falseColor('danger')
                    ->falseIcon('heroicon-o-x-circle')
                    ->trueIcon('heroicon-o-check-circle')
                    ->label('Available'),


            ])
            ->filters([
                SelectFilter::make('city_id')->relationship('city', 'name')->label('City'),
                SelectFilter::make('is_full_booked')->label('Available')->options([
                    '1' => 'Full',
                    '0' => 'Available',
                ])

            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
                Tables\Actions\ViewAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOfficeSpaces::route('/'),
            'create' => Pages\CreateOfficeSpace::route('/create'),
            'edit' => Pages\EditOfficeSpace::route('/{record}/edit'),
        ];
    }
}
