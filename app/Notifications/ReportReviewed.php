<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ReportReviewed extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    protected $report;

    public function __construct($report)
    {
        $this->report = $report;
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'report_id' => $this->report->id,
            'doctor_name' => $this->report->doctor->name,
            'message' => 'Your medical report has been reviewed by ' . $this->report->doctor->name,
        ];
    }
}
