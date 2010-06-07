<style>
#pnlError{
    color:red;
}
p{
    margin-bottom:20Px;
}
</style>
<div class="toolbar">
    <h1>Calculator Example</h1>
    <a class="MJaxTouchBackBtn" href="#">Back</a>
</div>
<p>
    <?php $_CONTROL->pnlError->Render(); ?>
</p>
<p>
    <?php $_CONTROL->txtNum1->Render(); ?>
</p>
<p>
    <?php $_CONTROL->txtNum2->Render(); ?>
</p>
<p>
    <?php $_CONTROL->selOperator->Render(); ?>
</p>
<p>
    <?php $_CONTROL->txtResult->Render(); ?>
</p>
<p>
    <?php $_CONTROL->btnCalc->Render(); ?>
</p>