<?php
/* 
 * This is a basic MJax Touch Application setup
 */

require_once("prepend.inc.php");
class index extends MJaxTouchPage{
    protected $scnHome = null;
    public $scnList = null;
    public $scnForm = null;
    public $scnTransition = null;
    public $scnTransitionFinish = null;
    protected function Form_Create(){
        $this->scnList = new ScnList($this, 'scnList');
        $this->scnHome = new ScnHome($this, 'scnHome');
        $this->scnForm = new ScnForm($this, 'scnForm');
        $this->scnTransition = new ScnTransition($this, 'scnTransition');
        $this->scnTransitionFinish = new ScnTransitionFinish($this, 'scnTransitionFinish');
        
        $this->SetActiveScreen($this->scnHome);

    }
}
index::Run('index');
?>
