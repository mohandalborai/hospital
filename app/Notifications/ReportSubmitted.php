<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ReportSubmitted extends Notification
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
            'patient_name' => $this->report->patient->name,
            'specialty' => $this->report->required_specialty,
            'message' => 'New medical report submitted for your specialty: ' . $this->report->required_specialty,
        ];
    }
}
