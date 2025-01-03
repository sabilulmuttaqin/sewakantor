<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BookingTransactionResource\Pages;
use App\Filament\Resources\BookingTransactionResource\RelationManagers;
use App\Models\BookingTransaction;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class BookingTransactionResource extends Resource
{
    protected static ?string $model = BookingTransaction::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Utama')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Nama')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\Select::make("office_space_id")->required()
                            ->preload()
                            ->searchable()
                            ->relationship('officeSpace', 'name'),
                        Forms\Components\TextInput::make('booking_trx_id')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('phone_number')

                            ->required()
                            ->maxLength(255),
                    ])
                    ->columns(2),
                Forms\Components\Section::make('Harga')
                    ->schema([

                        Forms\Components\TextInput::make('total_amount')
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
                    ->columns(2),

                Forms\Components\Section::make('Status Pembayaran')
                    ->schema([
                        Forms\Components\DatePicker::make("started_at")->required(),
                        Forms\Components\DatePicker::make("ended_at")->required(),
                        Forms\Components\Select::make("is_paid")->options([
                            true => 'Paid',
                            false => 'Not Paid'
                        ])->required(),
                    ])
                    ->columns(3),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([

                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('officeSpace.name')->label("Nama kantor"),

                Tables\Columns\TextColumn::make('booking_trx_id')
                    ->searchable(),
                Tables\Columns\TextColumn::make('phone_number'),

                Tables\Columns\TextColumn::make('duration'),


                Tables\Columns\IconColumn::make('is_paid')
                    ->boolean()
                    ->label('Verified')
                    ->trueColor('success')
                    ->falseColor('danger')
                    ->trueIcon('heroicon-o-check-circle')
                    ->falseIcon('heroicon-o-x-circle'),

            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
                Tables\Actions\Action::make('verified')
                    ->label('Verified')
                    ->action(function (BookingTransaction $record) {
                        $record->is_paid = true;
                        $record->save();

                        Notification::make()
                            ->title('Order verified')
                            ->success()
                            ->body('Order has been successfully verified')
                            ->send();
                    })
                    ->color('success')
                    ->requiresConfirmation()
                    ->visible(fn(BookingTransaction $record) => ! $record->is_paid),

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
            'index' => Pages\ListBookingTransactions::route('/'),
            'create' => Pages\CreateBookingTransaction::route('/create'),
            'edit' => Pages\EditBookingTransaction::route('/{record}/edit'),
        ];
    }
}
